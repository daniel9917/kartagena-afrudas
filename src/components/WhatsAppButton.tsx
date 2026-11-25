export function WhatsAppButton({ href }: { href: string }) {
  return (
    <a className="wa-fab" href={href} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp">
      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M20.5 11.6c0 4.7-3.8 8.5-8.5 8.5-1.5 0-2.9-.4-4.1-1.1L3 20.5l1.6-4.8a8.5 8.5 0 1 1 15.9-4.1Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 8.4c.2-.5.4-.5.7-.5h.6c.2 0 .5 0 .7.5l.8 1.8c.1.3 0 .5-.2.7l-.5.6c.3.6.8 1.1 1.4 1.4l.6-.5c.2-.2.4-.2.7-.1l1.8.8c.3.1.5.4.5.7v.6c0 .3-.2.6-.7.8-.3.1-.8.2-1.5-.1-1.3-.4-2.4-1.2-3.3-2.3-.9-1.1-1.4-2.4-1.5-3.5-.1-.5.1-1 .6-1.3l.3-.3Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
