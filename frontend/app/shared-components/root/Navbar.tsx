import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="flex flex-row  mx-2 my-2 p-2">
      <nav className="flex flex-row space-x-2 ">
        <Link
          className="bg-secondary hover:bg-primary hover:text-white rounded px-4 py-2"
          href="/"
        >
          <h2>Logo</h2>
        </Link>
        <Link
          className="bg-secondary hover:bg-primary hover:text-white rounded px-4 py-2"
          href="/teacher_dashboard"
        >
          Teacher dashboard
        </Link>
        <Link
          className="bg-secondary hover:bg-primary hover:text-white rounded px-4 py-2"
          href="/student"
        >
          Student
        </Link>
        <Link
          className="bg-secondary hover:bg-primary hover:text-white rounded px-4 py-2"
          href="/scripted-student"
        >
          scripted interaction for testing
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
