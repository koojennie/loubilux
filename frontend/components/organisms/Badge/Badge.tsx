interface BadgeProps {
    children: React.ReactNode;
    color?: "green" | "yellow" | "gray";
}

const Badge: React.FC<BadgeProps> = ({ children, color = "gray" }) => {
const base = "inline-block px-2 py-1 text-xs font-medium rounded border";
const colors = {
    green: "text-green-600 border-green-600 bg-green-50",
    yellow: "text-yellow-600 border-yellow-600 bg-yellow-50",
    gray: "text-slate-600 border-slate-400 bg-slate-100",
};

return <span className={`${base} ${colors[color]}`}>{children}</span>;
};

export default Badge;
  