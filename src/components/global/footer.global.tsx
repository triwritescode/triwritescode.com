type FooterProps = {
  footer?: {
    copyright?: string | null;
  } | null;
};

const Footer = ({ footer }: FooterProps) => {
  return (
    <footer className="border-t border-gray-900 px-4 py-8">
      <p className="text-center text-sm text-gray-600">
        {footer?.copyright ||
          `© ${new Date().getFullYear()} Tri Denda. All rights reserved.`}
      </p>
    </footer>
  );
};

export default Footer;
