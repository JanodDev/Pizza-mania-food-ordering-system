import React from 'react';

export default function MainButton({
  buttonText,
  iconPath = '',
  backColor = '',
  hoverColor = '',
}) {
  return (
    <button
      className={`w-36 rounded-md px-5 py-3 font-main text-white transition-colors hover:${hoverColor} ${backColor}`}
    >
      <span className="flex items-center justify-center gap-2">
        <img src={iconPath} alt="button icon" />
        <span>{buttonText}</span>
      </span>
    </button>
  );
}
