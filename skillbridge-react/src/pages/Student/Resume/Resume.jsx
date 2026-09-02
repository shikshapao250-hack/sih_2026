import { useRef, useState } from "react";

function Resume({ onNavigate }) {
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    setError("");

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Resume must be smaller than 5 MB.");
      return;
    }

    setResume({
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toLocaleDateString(),
    });
  };

  const handleInputChange = (event) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    handleFile(event.dataTransfer.files?.[0]);
  };

  const removeResume = () => {
    setResume(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() =>
              onNavigate("student")
            }
            className="text-sm font-bold text-slate-600 transition hover:text-indigo-600"
          >
            ← Dashboard
          </button>

          <span className="text-sm font-black text-slate-900">
            Resume
          </span>

        </div>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="mx-auto max-w-5xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* HERO */}

        <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-6 text-white shadow-xl sm:p-9">

          <p className="text-xs font-black uppercase tracking-widest text-indigo-300">
            Professional profile
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Add your resume.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Your resume is optional, but adding one can
            give organizations a clearer picture of your
            experience and achievements.
          </p>

        </section>


        {/* =====================================
            UPLOAD CARD
        ===================================== */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div>

            <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
              Resume upload
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              {resume
                ? "Your resume"
                : "Upload your resume"}
            </h2>

          </div>


          {!resume ? (

            <>
              {/* DROP AREA */}

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                onDragOver={(event) =>
                  event.preventDefault()
                }
                onDrop={handleDrop}
                className="mt-6 flex w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center transition hover:border-indigo-300 hover:bg-indigo-50/40 sm:py-16"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  📄
                </div>

                <p className="mt-5 text-sm font-black text-slate-800">
                  Choose your resume
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Click to browse or drag and drop your
                  file here
                </p>

                <span className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-black text-white">
                  Choose file
                </span>

                <p className="mt-4 text-[10px] font-bold text-slate-400">
                  PDF or DOCX • Maximum 5 MB
                </p>

              </button>


              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleInputChange}
                className="hidden"
              />


              {error && (

                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-bold text-red-600">
                  {error}
                </div>

              )}

            </>

          ) : (

            /* =================================
               RESUME PREVIEW
            ================================= */

            <div className="mt-6">

              <div className="flex flex-col gap-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                    📄
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-black text-slate-900">
                      {resume.name}
                    </p>

                    <div className="mt-1 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">

                      <span>
                        {formatFileSize(
                          resume.size
                        )}
                      </span>

                      <span>•</span>

                      <span>
                        Uploaded {resume.uploadedAt}
                      </span>

                    </div>

                  </div>

                </div>


                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                  >
                    Replace
                  </button>

                  <button
                    type="button"
                    onClick={removeResume}
                    className="rounded-xl border border-red-100 bg-white px-3 py-2 text-xs font-black text-red-500 transition hover:bg-red-50"
                  >
                    Remove
                  </button>

                </div>

              </div>


              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleInputChange}
                className="hidden"
              />


              {/* STATUS */}

              <div className="mt-5 grid gap-3 sm:grid-cols-3">

                <StatusCard
                  icon="✓"
                  title="Uploaded"
                  description="Resume is available"
                />

                <StatusCard
                  icon="🔒"
                  title="Private"
                  description="Visible according to your profile settings"
                />

                <StatusCard
                  icon="↗"
                  title="Useful"
                  description="Helps organizations understand you"
                />

              </div>

            </div>

          )}

        </section>


        {/* =====================================
            PRIVACY
        ===================================== */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
              🔐
            </div>

            <div>

              <p className="text-sm font-black text-slate-900">
                Your resume, your choice.
              </p>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                Uploading a resume is optional. You should
                only share information that you are
                comfortable making available through your
                SkillBridge profile.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            NEXT STEP
        ===================================== */}

        <section className="mt-6 rounded-3xl bg-indigo-600 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">

          <p className="text-xs font-black uppercase tracking-widest text-indigo-200">
            Next
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Discover opportunities built for you.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100">
            SkillBridge can use your profile, skills,
            projects and education to surface relevant
            internships and jobs.
          </p>

          <button
            type="button"
            onClick={() =>
              onNavigate(
                "student-opportunities"
              )
            }
            className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-black text-indigo-700 transition hover:bg-indigo-50"
          >
            Explore opportunities →
          </button>

        </section>

      </main>

    </div>
  );
}


/* ==========================================
   STATUS CARD
========================================== */

function StatusCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-xs shadow-sm">
          {icon}
        </div>

        <p className="text-xs font-black text-slate-800">
          {title}
        </p>

      </div>

      <p className="mt-3 text-[10px] leading-5 text-slate-400">
        {description}
      </p>

    </div>
  );
}

export default Resume;