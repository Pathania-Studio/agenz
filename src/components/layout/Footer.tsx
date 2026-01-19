"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-black pt-24 pb-12 text-white">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="mx-auto max-w-7xl px-6">
        {/* Top */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">Agenz</h3>
            <p className="max-w-xs text-sm text-gray-400">A creative agency crafting meaningful digital experiences through design, motion, and technology.</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">Navigation</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-gray-300">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">Connect</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-gray-300" target="_blank">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300" target="_blank">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300" target="_blank">
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} Agenz. All rights reserved.</p>
          <p>Built with clarity & care.</p>
        </div>
      </motion.div>
    </footer>
  );
}
