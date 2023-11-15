import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="flex flex-row">
      <h2>Logo</h2>
      <nav className="flex flex-row">
        <Link href="/">home</Link>
        <Link href="/teacher_dashboard">Teacher dashboard</Link>
        <Link href="/student">Student</Link>
      </nav>
    </div>
  );
}

export default Navbar;
