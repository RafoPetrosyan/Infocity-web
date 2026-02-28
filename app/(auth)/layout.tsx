import Image from "next/image";
import logo from '../assets/svg/Logo.svg'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-page)] text-[var(--color-ink)]">
      <div className="relative flex min-h-screen flex-col">
        <div className="rounded-b-[32px] bg-[var(--color-primary)] px-6 pt-10 pb-16 shadow-sm sm:rounded-b-[40px]">
          <div className="mx-auto flex max-w-5xl items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15">
              <Image src={logo} alt="IMCITY logo" width={48} height={48} />
            </div>
          </div>
        </div>

        <div className="mx-auto -mt-12 w-full max-w-md px-6 pb-12">
          <div className="rounded-[32px] bg-[var(--color-surface)] p-8 shadow-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
