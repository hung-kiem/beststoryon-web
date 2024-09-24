import { StudentDetail } from "@/components/swr";
import * as React from "react";

function SWRPage() {
  return (
    <div>
      <h1>SWG LAB</h1>

      <ul>
        <li>
          <StudentDetail studentId="aqbbx1vj1lqrtv3ya" />
        </li>
        <li>
          <StudentDetail studentId="aqbbx1vj1lqrtv3ya" />
        </li>
        <li>
          <StudentDetail studentId="aqbbx1vj1lqrtv3ya" />
        </li>
      </ul>
    </div>
  );
}

export default SWRPage;
