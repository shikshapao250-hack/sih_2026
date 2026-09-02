import { useEffect, useState } from "react";
import "./App.css";

/* ==========================================
   COMMON
========================================== */

import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";

/* ==========================================
   PUBLIC
========================================== */

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Discover from "./pages/Discover/Discover";

/* ==========================================
   AUTH
========================================== */

import Login from "./pages/auth/Login/Login";
import SignUp from "./pages/auth/SignUp/SignUp";
import RoleSelection from "./pages/auth/RoleSelection/RoleSelection";

/* ==========================================
   STUDENT
========================================== */

import StudentDashboard from "./pages/Student/Dashboard/Dashboard";
import StudentProfile from "./pages/Student/Profile/Profile";
import StudentSkills from "./pages/Student/Skills/Skills";
import StudentProjects from "./pages/Student/Projects/Projects";
import StudentEducation from "./pages/Student/Education/Education";
import StudentResume from "./pages/Student/Resume/Resume";
import StudentOpportunities from "./pages/Student/Opportunities/Opportunities";

/* ==========================================
   ORGANIZATION
========================================== */

import OrganizationDashboard from "./pages/Organization/OrganizationDashboard/OrganizationDashboard";
import OrganizationCreateJob from "./pages/Organization/CreateJob/CreateJob";
import OrganizationBrowseStudents from "./pages/Organization/BrowseStudents/BrowseStudents";
import OrganizationMyJobs from "./pages/Organization/MyJobs/MyJobs";

/* ==========================================
   COLLEGE
========================================== */

import CollegeDashboard from "./pages/College/CollegeDashboard/CollegeDashboard";
import CollegeBrowseStudents from "./pages/College/BrowseStudents/BrowseStudents";
import CollegeBrowseColleges from "./pages/College/BrowseColleges/BrowseColleges";
import CollegeSkillGap from "./pages/College/SkillGap/SkillGap";

/* ==========================================
   TESTS
========================================== */

import Tests from "./pages/Tests/Tests";


function App() {

  /* ==========================================
     PAGE
  ========================================== */

  const [page, setPage] = useState("home");


  /* ==========================================
     USER
     
     Safe localStorage loading.
     Prevents:
     JSON.parse("undefined")
     from crashing the application.
  ========================================== */

  const [user, setUser] = useState(() => {

    try {

      const savedUser =
        localStorage.getItem("skillbridge_user");

      if (
        !savedUser ||
        savedUser === "undefined" ||
        savedUser === "null"
      ) {
        return null;
      }

      const parsedUser = JSON.parse(savedUser);

      if (
        !parsedUser ||
        typeof parsedUser !== "object"
      ) {
        localStorage.removeItem(
          "skillbridge_user"
        );

        return null;
      }

      return parsedUser;

    } catch (error) {

      console.warn(
        "Invalid saved user. Clearing local storage."
      );

      localStorage.removeItem(
        "skillbridge_user"
      );

      return null;
    }

  });


  /* ==========================================
     SAVE USER
  ========================================== */

  useEffect(() => {

    try {

      if (user) {

        localStorage.setItem(
          "skillbridge_user",
          JSON.stringify(user)
        );

      } else {

        localStorage.removeItem(
          "skillbridge_user"
        );

      }

    } catch (error) {

      console.error(
        "Unable to save user:",
        error
      );

    }

  }, [user]);


  /* ==========================================
     NAVIGATION
  ========================================== */

  const navigate = (newPage) => {

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* ==========================================
     LOGIN
  ========================================== */

  const handleLogin = (userData) => {

    if (!userData) {
      return;
    }

    setUser(userData);

    switch (userData.role) {

      case "student":
        navigate("student");
        break;

      case "organization":
        navigate("organization");
        break;

      case "college":
        navigate("college");
        break;

      default:
        navigate("home");
        break;

    }

  };


  /* ==========================================
     LOGOUT
  ========================================== */

  const handleLogout = () => {

    setUser(null);

    localStorage.removeItem(
      "skillbridge_user"
    );

    navigate("home");

  };


  /* ==========================================
     DASHBOARD
  ========================================== */

  const isDashboard =
    page === "student" ||
    page === "organization" ||
    page === "college";


  /* ==========================================
     PAGE RENDER
  ========================================== */

  const renderPage = () => {

    switch (page) {

      /* ======================================
         PUBLIC
      ====================================== */

      case "home":

        return (
          <Home
            onNavigate={navigate}
          />
        );


      case "about":

        return (
          <About
            onNavigate={navigate}
          />
        );


      case "discover":

        return (
          <Discover
            onNavigate={navigate}
          />
        );


      /* ======================================
         AUTH
      ====================================== */

      case "login":

        return (
          <Login
            onLogin={handleLogin}
            onNavigate={navigate}
          />
        );


      case "signup":

        return (
          <SignUp
            onLogin={handleLogin}
            onNavigate={navigate}
          />
        );


      case "role-selection":

        return (
          <RoleSelection
            onNavigate={navigate}
          />
        );


      /* ======================================
         STUDENT
      ====================================== */

      case "student":

        return (
          <StudentDashboard
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );


      case "student-profile":

        return (
          <StudentProfile
            user={user}
            onNavigate={navigate}
          />
        );


      case "student-skills":

        return (
          <StudentSkills
            user={user}
            onNavigate={navigate}
          />
        );


      case "student-projects":

        return (
          <StudentProjects
            user={user}
            onNavigate={navigate}
          />
        );


      case "student-education":

        return (
          <StudentEducation
            user={user}
            onNavigate={navigate}
          />
        );


      case "student-resume":

        return (
          <StudentResume
            user={user}
            onNavigate={navigate}
          />
        );


      case "student-opportunities":

        return (
          <StudentOpportunities
            user={user}
            onNavigate={navigate}
          />
        );


      /* ======================================
         ORGANIZATION
      ====================================== */

      case "organization":

        return (
          <OrganizationDashboard
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );


      case "organization-create-job":

        return (
          <OrganizationCreateJob
            user={user}
            onNavigate={navigate}
          />
        );


      case "organization-students":

        return (
          <OrganizationBrowseStudents
            user={user}
            onNavigate={navigate}
          />
        );


      case "organization-jobs":

        return (
          <OrganizationMyJobs
            user={user}
            onNavigate={navigate}
          />
        );


      /* ======================================
         COLLEGE
      ====================================== */

      case "college":

        return (
          <CollegeDashboard
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );


      case "college-students":

        return (
          <CollegeBrowseStudents
            user={user}
            onNavigate={navigate}
          />
        );


      case "college-colleges":

        return (
          <CollegeBrowseColleges
            user={user}
            onNavigate={navigate}
          />
        );


      case "college-skill-gap":

        return (
          <CollegeSkillGap
            user={user}
            onNavigate={navigate}
          />
        );


      /* ======================================
         TESTS
      ====================================== */

      case "tests":

        return (
          <Tests
            user={user}
            onNavigate={navigate}
          />
        );


      /* ======================================
         FALLBACK
      ====================================== */

      default:

        return (
          <Home
            onNavigate={navigate}
          />
        );

    }

  };


  /* ==========================================
     APPLICATION
  ========================================== */

  return (

    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ======================================
          NAVBAR
      ====================================== */}

      {!isDashboard && (

      <Navbar
  user={user}

  onHome={() =>
    navigate("home")
  }

  onLogin={() =>
    navigate("login")
  }

  onSignUp={() =>
    navigate("role-selection")
  }

  onDiscover={() =>
    navigate("discover")
  }

  onOpportunities={() =>
    navigate("student-opportunities")
  }

  onAbout={() =>
    navigate("about")
  }

  onNavigate={navigate}

  onLogout={handleLogout}
/>
    

      )}


      {/* ======================================
          PAGE
      ====================================== */}

      <main>
        {renderPage()}
      </main>


      {/* ======================================
          FOOTER
      ====================================== */}

      {!isDashboard && (
        <Footer />
      )}

    </div>

  );

}


export default App;