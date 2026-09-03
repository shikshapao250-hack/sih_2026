import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

export const ROLES = Object.freeze({
	STUDENT: 'STUDENT',
	COLLEGE: 'COLLEGE',
	ORGANISATION: 'ORGANISATION',
});

const userSchema = new mongoose.Schema(
	{
		uid: { type: String, required: true, unique: true, index: true },
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, lowercase: true },
		role: { type: String, required: true, enum: Object.values(ROLES) },
	},
	{ timestamps: true }
);

const roleModels = {
	[ROLES.STUDENT]: mongoose.model('Student', userSchema, 'students'),
	[ROLES.COLLEGE]: mongoose.model('College', userSchema, 'colleges'),
	[ROLES.ORGANISATION]: mongoose.model('Organisation', userSchema, 'organisations'),
};

router.post('/user', async (req, res) => {
	const { uid, name, email, role } = req.body ?? {};
	console.info('[auth] POST /auth/user', { uid, email, role });

	if (!uid || !name || !email || !role) {
		console.warn('[auth] User sync rejected: missing required fields', { uid, email, role });
		return res.status(400).json({ error: 'uid, name, email and role are required' });
	}

	if (!Object.values(ROLES).includes(role)) {
		console.warn('[auth] User sync rejected: invalid role', { uid, email, role });
		return res.status(400).json({ error: 'role must be STUDENT, COLLEGE or ORGANISATION' });
	}

	try {
		const user = await roleModels[role].findOneAndUpdate(
			{ uid },
			{ uid, name, email, role },
			{ new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
		);

		console.info('[auth] User sync succeeded', { uid, email, role });
		return res.status(200).json(user);
	} catch (error) {
		console.error('[auth] User sync failed', { uid, email, role, message: error.message });
		return res.status(500).json({ error: 'Unable to save user' });
	}
});

router.get('/user/:uid', async (req, res) => {
	const { uid } = req.params;
	console.info('[auth] GET /auth/user/:uid', { uid });

	if (!uid) {
		console.warn('[auth] Role lookup rejected: missing uid');
		return res.status(400).json({ error: 'uid is required' });
	}

	try {
		const users = await Promise.all(
			Object.entries(roleModels).map(async ([role, model]) => ({
				role,
				user: await model.findOne({ uid }).select('uid role').lean(),
			}))
		);
		const match = users.find(({ user }) => user);

		if (!match) {
			console.info('[auth] Role lookup found no user', { uid, status: 404 });
			return res.status(404).json({ error: 'User not found' });
		}

		console.info('[auth] Role lookup succeeded', { uid, role: match.role });
		return res.status(200).json({ uid: match.user.uid, role: match.role });
	} catch (error) {
		console.error('[auth] Role lookup failed', { uid, message: error.message });
		return res.status(500).json({ error: 'Unable to check user role' });
	}
});

export default router;
