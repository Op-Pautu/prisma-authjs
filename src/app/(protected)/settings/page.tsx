import { signOut } from "@/auth";
import React from "react";

const SettingsPage = async () => {
  return (
    <div>
      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: "/auth/login" });
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
