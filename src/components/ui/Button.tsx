import Link from 'next/link';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'tan-dark' | 'white' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-r4v-primary text-white hover:bg-r4v-primary-hover',
  secondary: 'bg-r4v-tan text-gray-900 hover:bg-r4v-tan-hover',
  dark: 'bg-r4v-secondary text-white hover:bg-r4v-secondary-hover',
  'tan-dark': 'bg-r4v-tan-dark text-gray-900 hover:bg-r4v-tan-dark-hover',
  white: 'bg-white text-r4v-primary hover:bg-r4v-tan',
  outline: 'border-2 border-r4v-primary text-r4v-primary hover:bg-r4v-primary hover:text-white bg-transparent',
  ghost: 'text-r4v-primary hover:bg-r4v-primary/10 bg-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  href,
  target,
  rel,
  disabled,
  ...buttonProps
}: ButtonProps) {
  const baseStyles = 'rounded-lg font-bold transition inline-flex items-center justify-center';
  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`.trim();

  const content = (
    <>
      {loading && <Spinner />}
      {children}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={classes}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={classes}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
