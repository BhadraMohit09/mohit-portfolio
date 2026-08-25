import React, {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

type FakeErrorSplashProps = {
  children: ReactNode;
  delay?: number;
  domain?: string;
  errorCode?: string;
};

const FakeErrorSplash = ({
  children,
  delay = 0,
  domain,
  errorCode = "SUCC_CONNECTION_OPENED",
}: FakeErrorSplashProps) => {
  const [show, setShow] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const host =
    domain ||
    (typeof window !== "undefined"
      ? window.location.host
      : "yourdomain.vercel.app");

  // Lock scroll while splash is visible
  useEffect(() => {
    if (show) {
      const currentScrollY = window.scrollY;

      setScrollY(currentScrollY);

      document.body.style.position = "fixed";
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [show, scrollY]);

  // Automatically hide splash after delay
  useEffect(() => {
    if (delay <= 0) {
      return;
    }

    const hideTimer = window.setTimeout(() => {
      setShow(false);
    }, delay);

    const finishTimer = window.setTimeout(() => {
      setIsFinished(true);
    }, delay + 1000);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(finishTimer);
    };
  }, [delay]);

  // Smooth progress animation
  useEffect(() => {
    if (!show) {
      return;
    }

    let value = 0;

    const interval = window.setInterval(() => {
      value = Math.min(value + Math.random() * 10 + 5, 100);

      setProgress(value);

      if (value >= 100) {
        window.clearInterval(interval);
      }
    }, 200);

    return () => {
      window.clearInterval(interval);
    };
  }, [show]);

  return (
    <div className="relative">
      {/* Main Content */}
      <div
        className={
          isFinished
            ? ""
            : `transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
                show
                  ? "opacity-0 scale-95 blur-md pointer-events-none h-screen overflow-hidden"
                  : "opacity-100 scale-100 blur-0"
              }`
        }
      >
        {children}
      </div>

      {/* Splash Overlay */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            role="alert"
            aria-live="assertive"
            className="fixed inset-0 z-[9999] bg-white text-gray-800 flex flex-col"
          >
            {/* Body */}
            <div className="flex-1 flex pt-[10vh] justify-center px-6 bg-white">
              <div className="max-w-[600px] w-full flex flex-col items-start gap-4 font-['Segoe_UI',Tahoma,sans-serif]">
                {/* Error Icon (Sad Document) */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  className="mb-1"
                >
                  <g
                    fill="none"
                    stroke="#5f6368"
                    strokeWidth="2"
                  >
                    <path d="M30 2H14a4 4 0 0 0-4 4v36a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V10z" />
                    <path d="M30 2v10h10" />
                    <circle cx="19" cy="22" r="1.5" fill="#5f6368" stroke="none" />
                    <circle cx="29" cy="22" r="1.5" fill="#5f6368" stroke="none" />
                    <path d="M18 31c2.2-2 9.8-2 12 0" strokeLinecap="round" />
                  </g>
                </svg>

                {/* Content */}
                <div>
                  <h1 className="text-[20px] font-medium text-[#202124] leading-snug mb-3">
                    This site <span className="font-semibold">actually can</span> be reached
                  </h1>

                  <p className="text-[14px] text-[#5f6368] leading-relaxed mb-5">
                    <strong className="text-[#202124] font-medium">{host}</strong> unexpectedly opened the connection.
                  </p>

                  {/* Suggestions */}
                  <div className="mb-6">
                    <p className="text-[14px] text-[#5f6368] mb-1">Try:</p>
                    <ul className="space-y-1 text-[14px] ml-8 list-disc text-[#5f6368]">
                      <li>Checking the connection</li>
                      <li>
                        <span className="text-[#1a73e8] hover:underline cursor-pointer">
                          Checking the proxy and the firewall
                        </span>
                      </li>
                      <li>
                        <span className="text-[#1a73e8] hover:underline cursor-pointer">
                          Running Windows Network Diagnostics
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Error Code */}
                  <p className="text-[12px] text-[#5f6368] tracking-wide mb-6">
                    {errorCode}
                  </p>

                  {/* Reload Button */}
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    className="inline-flex items-center justify-center rounded bg-[#1a73e8] px-6 py-[8px] text-white text-[13px] font-medium transition hover:bg-[#1b6add] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-2"
                  >
                    Reload
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FakeErrorSplash;