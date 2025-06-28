"use client";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";

const TermsPage = () => {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-base-300 transition-all duration-300">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 sm:mb-6 shadow-lg transition-all duration-300">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transition-all duration-300">
              Terms & Conditions
            </h1>
            <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed px-4">
              Welcome to our Terms and Conditions page. Please read these terms carefully before using our service.
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-base-100/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-base-content/10 p-6 sm:p-8 md:p-12 transition-all duration-300">
            <div className="space-y-6 sm:space-y-8">
              {/* Section 1 */}
              <section className="group">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <span className="text-primary font-semibold text-xs sm:text-sm">1</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-base-content mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                      Acceptance of Terms
                    </h2>
                    <p className="text-base-content/70 leading-relaxed text-sm sm:text-base">
                      By accessing or using our service, you agree to be bound by these terms. If you do not agree, please do not use our service.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section className="group">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-all duration-300">
                    <span className="text-secondary font-semibold text-xs sm:text-sm">2</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-base-content mb-2 sm:mb-3 group-hover:text-secondary transition-colors duration-300">
                      Changes to Terms
                    </h2>
                    <p className="text-base-content/70 leading-relaxed text-sm sm:text-base">
                      We may update these terms from time to time. We will notify you of any changes by posting the new terms on this page. Your continued use of the service after any changes constitutes your acceptance of the new terms.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="group">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                    <span className="text-accent font-semibold text-xs sm:text-sm">3</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-base-content mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">
                      Use of Service
                    </h2>
                    <p className="text-base-content/70 leading-relaxed text-sm sm:text-base">
                      You agree to use our service only for lawful purposes and in accordance with these terms. You must not use the service in any way that violates any applicable local, national, or international law or regulation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section className="group">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <span className="text-primary font-semibold text-xs sm:text-sm">4</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-base-content mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                      User Accounts
                    </h2>
                    <p className="text-base-content/70 leading-relaxed text-sm sm:text-base">
                      To access certain features of our service, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section className="group">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-all duration-300">
                    <span className="text-secondary font-semibold text-xs sm:text-sm">5</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-base-content mb-2 sm:mb-3 group-hover:text-secondary transition-colors duration-300">
                      Termination
                    </h2>
                    <p className="text-base-content/70 leading-relaxed text-sm sm:text-base">
                      We reserve the right to terminate or suspend your access to our service at any time, without notice, for conduct that we believe violates these terms or is harmful to other users.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-base-content/10">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2 text-base-content/50">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm">Last updated: June 24, 2025</span>
                </div>
                <div className="flex items-center space-x-2 text-base-content/50">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm">Version 2.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
