import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-extrabold text-emerald-700">
            Jobs Africa
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/jobs"
              className="font-medium text-slate-700 hover:text-emerald-700"
            >
              Find Jobs
            </Link>

            <a
              href="#how-it-works"
              className="font-medium text-slate-700 hover:text-emerald-700"
            >
              How It Works
            </a>

            <a
              href="#about"
              className="font-medium text-slate-700 hover:text-emerald-700"
            >
              About Us
            </a>
          </div>

          <div className="flex gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-16">
          <div className="max-w-3xl">
            <p className="mb-4 font-bold tracking-widest text-emerald-700">
              AFRICA&apos;S FREELANCE JOB PLATFORM
            </p>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Turn your skills into opportunities
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Jobs Africa connects students, freelancers and clients across
              Africa. Find opportunities, showcase your skills and build your
              career.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/jobs"
                className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800"
              >
                Find Jobs
              </Link>

              <Link
                href="/signup"
                className="rounded-lg border border-emerald-700 px-6 py-3 font-bold text-emerald-700 hover:bg-emerald-50"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="mt-12 w-full lg:mt-0">
            <div className="rounded-2xl bg-emerald-700 p-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold">
                Your next opportunity is waiting.
              </h2>

              <p className="mt-4 leading-7 text-emerald-50">
                Whether you are looking for freelance work or need talented
                people for your project, Jobs Africa makes the connection
                easier.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-5">
                  <p className="text-3xl font-extrabold">100+</p>
                  <p className="mt-1 text-sm text-emerald-100">
                    Opportunities
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-5">
                  <p className="text-3xl font-extrabold">Africa</p>
                  <p className="mt-1 text-sm text-emerald-100">
                    Built for Africa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-bold tracking-widest text-emerald-700">
              OPPORTUNITIES
            </p>

            <h2 className="mt-2 text-3xl font-extrabold">
              Featured Jobs
            </h2>

            <p className="mt-3 text-slate-600">
              Explore opportunities and find work that matches your skills.
            </p>
          </div>

          <Link
            href="/jobs"
            className="font-bold text-emerald-700 hover:text-emerald-800"
          >
            View all jobs →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Website Design</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Tech Solutions Africa
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                $50–$150
              </span>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              Design a modern and responsive website for a growing African
              business.
            </p>

            <Link
              href="/jobs"
              className="mt-6 inline-block font-bold text-emerald-700 hover:text-emerald-800"
            >
              View Job →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Social Media Manager</h3>
                <p className="mt-2 text-sm text-slate-500">
                  African Business Hub
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                $30–$100
              </span>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              Manage social media content and help a business grow its online
              presence.
            </p>

            <Link
              href="/jobs"
              className="mt-6 inline-block font-bold text-emerald-700 hover:text-emerald-800"
            >
              View Job →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Data Entry Assistant</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Kampala Digital
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                $20–$80
              </span>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              Help organize, enter and maintain important business information
              accurately.
            </p>

            <Link
              href="/jobs"
              className="mt-6 inline-block font-bold text-emerald-700 hover:text-emerald-800"
            >
              View Job →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Jobs Africa */}
      <section id="about" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="font-bold tracking-widest text-emerald-700">
              WHY JOBS AFRICA
            </p>

            <h2 className="mt-2 text-3xl font-extrabold">
              Built to connect talent with opportunity
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Jobs Africa provides a simple platform where students and
              freelancers can discover work while clients can find people
              with the skills they need.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-3xl">💼</div>
              <h3 className="mt-4 text-xl font-bold">Find Opportunities</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Discover freelance jobs that match your skills and experience.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-3xl">🌍</div>
              <h3 className="mt-4 text-xl font-bold">African Talent</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Connect with clients and talented freelancers across Africa.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-3xl">🔒</div>
              <h3 className="mt-4 text-xl font-bold">Verified Users</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Our verification process helps create a more trusted
                marketplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="font-bold tracking-widest text-emerald-700">
            GET STARTED
          </p>

          <h2 className="mt-2 text-3xl font-extrabold">
            How Jobs Africa Works
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-xl font-extrabold text-emerald-700">
              1
            </div>

            <h3 className="mt-5 text-xl font-bold">Create an Account</h3>

            <p className="mt-3 leading-7 text-slate-600">
              Sign up and create your Jobs Africa account.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-xl font-extrabold text-emerald-700">
              2
            </div>

            <h3 className="mt-5 text-xl font-bold">Find or Post Jobs</h3>

            <p className="mt-3 leading-7 text-slate-600">
              Students and freelancers can find jobs while clients can post
              opportunities.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-xl font-extrabold text-emerald-700">
              3
            </div>

            <h3 className="mt-5 text-xl font-bold">Get Started</h3>

            <p className="mt-3 leading-7 text-slate-600">
              Apply for opportunities, connect with clients and start working.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/signup"
            className="inline-block rounded-lg bg-emerald-700 px-8 py-4 font-bold text-white hover:bg-emerald-800"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-2xl font-extrabold">Jobs Africa</h2>
              <p className="mt-2 text-slate-400">
                Connecting African talent with opportunity.
              </p>
            </div>

            <div className="flex gap-6">
              <Link
                href="/jobs"
                className="text-slate-300 hover:text-white"
              >
                Find Jobs
              </Link>

              <Link
                href="/login"
                className="text-slate-300 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="text-slate-300 hover:text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-700 pt-6 text-sm text-slate-400">
            © 2026 Jobs Africa. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}