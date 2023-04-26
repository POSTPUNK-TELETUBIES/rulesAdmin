export const Sticky = ({ content }: { content: JSX.Element }) => (
  <div
    style={{
      position: "sticky",
      bottom: 20,
      left: 20,
      display: "flex",
      justifyContent: "flex-end",
    }}
  >
    {content}
  </div>
);
