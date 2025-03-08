import React from "react";

export default function FooterItem() {
  return (
    <>
      <p className="text-lg fw-semibold color-palette-1 mb-12">{}</p>
      <ul className="list-unstyled">
        <li className="mb-6">
          <a href="" className="text-lg color-palette-1 text-decoration-none">
            About Us
          </a>
        </li>
        <li className="mb-6">
          <a href="" className="text-lg color-palette-1 text-decoration-none">
            Press Release
          </a>
        </li>
        <li className="mb-6">
          <a href="" className="text-lg color-palette-1 text-decoration-none">
            Terms of Use
          </a>
        </li>
        <li className="mb-6">
          <a href="" className="text-lg color-palette-1 text-decoration-none">
            Privacy & Policy
          </a>
        </li>
      </ul>
    </>
  );
}
