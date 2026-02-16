export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-6 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Truedge Digital. All rights reserved.</p>
      </div>
    </footer>
  );
}
