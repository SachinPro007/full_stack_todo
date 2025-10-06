import React, { useState } from "react";

const DemoAccountNotice = ({ userID }) => {
  const [isVisible, setIsVisible] = useState(true);

  const DEMO_USER_ID = "38db6901-cadc-40e6-9af2-69ad40808639";

  if (userID !== DEMO_USER_ID || !isVisible) {
    return null;
  }

  return (
    <div className="relative bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg mb-6">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 p-1 text-red-700 hover:bg-red-200 rounded-full transition-colors"
        aria-label="Close demo notice"
      >
        <span className="w-5 h-5">X</span>
      </button>

      <div className="p-1">
        <p className="text-red-700 text-sm text-center font-bold">
          ⚠️ PUBLIC DEMO ACCOUNT NOTICE ⚠️
        </p>
        <p className="text-red-700 text-sm text-center mt-1">
          This is a **shared, public demo account** for testing only. All tasks
          you see here were added by other users—they are **not** created by the
          developer. **Anyone using this account can see all tasks.**
        </p>
        <p className="text-red-700 text-sm text-center font-semibold mt-3">
          **For private use and security, please create your own personal
          account.** Your tasks will then be completely private and visible only
          to you.
        </p>
        <p className="text-red-600 text-xs text-center mt-2">
          (Please be respectful and **do not** enter sensitive information in
          this demo.)
        </p>
      </div>
    </div>
  );
};

export default DemoAccountNotice;
