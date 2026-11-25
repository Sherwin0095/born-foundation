import React from "react";
import Image, { type ImageProps } from "next/image";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

// ---- Layout Container Primitive ----
export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageContainer({ className, children, ...props }: PageContainerProps) {
  return (
    <div className={cn("page-container", className)} {...props}>
      {children}
    </div>
  );
}

// ---- Section Container ----
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  background?: "ivory" | "white" | "sage" | "green" | "muted";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Section({
  as: Component = "section",
  background = "ivory",
  padding = "lg",
  className,
  children,
  ...props
}: SectionProps) {
  const backgrounds: Record<string, string> = {
    ivory: "bg-warm-ivory",
    white: "bg-white",
    sage: "bg-soft-sage/45",
    green: "bg-forest-green text-white",
    muted: "bg-surface-muted",
  };

  const paddings: Record<string, string> = {
    none: "",
    sm: "py-10 md:py-14",
    md: "py-14 md:py-20",
    lg: "py-16 md:py-24",
  };

  return (
    <Component
      className={cn(backgrounds[background], paddings[padding], className)}
      {...props}
    >
      <div className="page-container">{children}</div>
    </Component>
  );
}

export const SectionContainer = Section;

// ---- Section Heading Primitive ----
export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={cn("max-w-3xl space-y-3", alignClasses, className)}>
      {eyebrow && (
        <span
          className={cn(
            "inline-block text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full",
            tone === "dark"
              ? "bg-white/10 text-warm-gold-light border border-white/15"
              : "bg-soft-sage text-forest-green"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] leading-tight",
          tone === "dark" ? "text-white" : "text-main-text"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed",
            tone === "dark" ? "text-white/90" : "text-secondary-text"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ---- Responsive Grid Primitive ----
export interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  gap?: "md" | "lg";
}

export function ResponsiveGrid({
  columns = 3,
  gap = "md",
  className,
  children,
  ...props
}: ResponsiveGridProps) {
  const colMap: Record<number, string> = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };
  const gapMap: Record<string, string> = {
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <div className={cn("grid", colMap[columns], gapMap[gap], className)} {...props}>
      {children}
    </div>
  );
}

// ---- Safe Optimised Image Component ----
export interface ImageComponentProps extends Omit<ImageProps, "alt"> {
  alt: string;
  aspectClass?: string;
}

export function ImageComponent({
  alt,
  className,
  aspectClass,
  ...props
}: ImageComponentProps) {
  if (aspectClass) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-muted", aspectClass)}>
        <Image
          alt={alt}
          className={cn("w-full h-full object-cover", className)}
          {...props}
        />
      </div>
    );
  }
  return <Image alt={alt} className={className} {...props} />;
}

// ---- Buttons ----
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";

  const variants: Record<string, string> = {
    primary:
      "bg-forest-green text-white hover:bg-forest-green-deep shadow-sm hover:shadow active:scale-[0.99]",
    secondary:
      "bg-muted-terracotta text-white hover:bg-muted-terracotta-dark shadow-sm hover:shadow active:scale-[0.99]",
    gold:
      "bg-warm-gold text-main-text hover:bg-warm-gold-light shadow-sm hover:shadow active:scale-[0.99]",
    outline:
      "border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white active:scale-[0.99]",
    ghost:
      "text-forest-green hover:bg-soft-sage hover:text-forest-green-dark",
    danger:
      "bg-red-700 text-white hover:bg-red-800",
  };

  const sizes: Record<string, string> = {
    sm: "min-h-10 px-3.5 py-2 text-xs md:text-sm tracking-wide",
    md: "min-h-11 px-4 sm:px-5 py-2.5 text-sm md:text-base",
    lg: "min-h-12 px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base md:text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="secondary" {...props} />;
}

// ---- Card ----
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  variant = "default",
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  const variants: Record<string, string> = {
    default: "bg-white rounded-2xl border border-border",
    bordered: "bg-white rounded-2xl border border-border",
    elevated:
      "bg-white rounded-2xl border border-border/80 shadow-md hover:shadow-lg transition-shadow duration-300",
    interactive:
      "bg-white rounded-2xl border border-border hover:border-forest-green hover:shadow-md transition-all duration-300 group",
  };

  const paddings: Record<string, string> = {
    none: "",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-7",
    lg: "p-8 sm:p-10",
  };

  return (
    <div className={cn(variants[variant], paddings[padding], className)} {...props}>
      {children}
    </div>
  );
}

// ---- Badge ----
export interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "gold";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", className, children }: BadgeProps) {
  const variants: Record<string, string> = {
    default: "bg-soft-sage text-forest-green border border-soft-sage-dark/40",
    success: "bg-green-100 text-green-900 border border-green-200",
    warning: "bg-amber-100 text-amber-900 border border-amber-200",
    danger: "bg-red-100 text-red-900 border border-red-200",
    info: "bg-blue-100 text-blue-900 border border-blue-200",
    gold: "bg-warm-gold/25 text-main-text border border-warm-gold/40",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ---- Input ----
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-main-text"
          >
            {label}
            {props.required && (
              <span className="text-red-700 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full min-h-11 px-4 py-2.5 rounded-lg border border-border bg-white text-main-text text-sm md:text-base",
            "placeholder:text-secondary-text/75",
            "focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent transition-all",
            "disabled:bg-surface-muted disabled:cursor-not-allowed",
            error && "border-red-600 focus:ring-red-600",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-red-700" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-xs text-secondary-text">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export const FormField = Input;

// ---- Textarea ----
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-semibold text-main-text"
          >
            {label}
            {props.required && (
              <span className="text-red-700 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border border-border bg-white text-main-text text-sm md:text-base",
            "placeholder:text-secondary-text/75 resize-y min-h-[120px] leading-relaxed",
            "focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent transition-all",
            "disabled:bg-surface-muted disabled:cursor-not-allowed",
            error && "border-red-600 focus:ring-red-600",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-xs font-medium text-red-700" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="text-xs text-secondary-text">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// ---- Select ----
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-semibold text-main-text"
          >
            {label}
            {props.required && (
              <span className="text-red-700 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full min-h-11 px-4 py-2.5 rounded-lg border border-border bg-white text-main-text text-sm md:text-base",
            "focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent transition-all",
            "disabled:bg-surface-muted disabled:cursor-not-allowed",
            error && "border-red-600 focus:ring-red-600",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs font-medium text-red-700" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

// ---- Empty State ----
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center max-w-xl mx-auto bg-surface-muted rounded-2xl border border-border">
      {icon && <div className="text-forest-green mb-4">{icon}</div>}
      <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-secondary-text text-sm md:text-base leading-relaxed mb-6">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

// ---- Error State ----
export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Unable to load content",
  description = "An unexpected issue interrupted loading this section. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-12 px-6 text-center max-w-lg mx-auto bg-red-50/70 rounded-2xl border border-red-200"
    >
      <AlertCircle className="w-8 h-8 text-red-700 mb-3" aria-hidden="true" />
      <h3 className="text-lg font-bold text-main-text mb-1.5">{title}</h3>
      <p className="text-sm text-secondary-text mb-5 leading-relaxed">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
          Retry
        </Button>
      )}
    </div>
  );
}

// ---- Loading State ----
export function LoadingState({ label = "Loading content..." }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-14 px-4 text-center"
    >
      <div className="w-9 h-9 border-4 border-forest-green border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-sm text-secondary-text font-medium">{label}</p>
    </div>
  );
}

// ---- Page Hero ----
export interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <div className="bg-forest-green text-white py-14 md:py-20 relative overflow-hidden border-b border-forest-green-dark">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-warm-gold blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-soft-sage blur-3xl" />
      </div>
      <div className="page-container relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-white/80">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && <span aria-hidden="true" className="opacity-60">/</span>}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="hover:text-warm-gold-light transition-colors font-medium"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-white font-semibold">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-[family-name:var(--font-heading)] max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// ---- Accordion ----
export interface AccordionItemData {
  id: string;
  title: string;
  content: string;
}

export interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id || null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-border overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface-muted transition-colors focus-visible:outline-2 focus-visible:outline-forest-green cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="font-semibold text-main-text text-base pr-4">
                {item.title}
              </span>
              <span
                className={cn(
                  "shrink-0 text-forest-green font-bold text-lg transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-6 pb-5 pt-2 text-secondary-text leading-relaxed text-sm md:text-base border-t border-border/40">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
