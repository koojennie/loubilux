interface BadgeProps {
    children: React.ReactNode;
    color?: "green" | "yellow" | "gray";
}

const Badge: React.FC<BadgeProps> = ({ children, color = "gray" }) => {
const base = "inline-block px-2 py-1 text-xs font-medium rounded border";
const colors = {
    green: "text-green-600 bg-green-100",
    yellow: "text-yellow-600 bg-yellow-100",
    gray: "text-slate-600 bg-slate-100",
};

return <span className={`${base} ${colors[color]}`}>{children}</span>;
};

export default Badge;
  