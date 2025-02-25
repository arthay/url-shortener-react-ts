'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';
import { Input } from "@/components/ui/input";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        {...props}
      />

      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
        tabIndex={-1}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
