import { LucideIcon } from 'lucide-react';

interface ItemProps {
  name: string;
  onClick: () => void;
  icon: LucideIcon;
}

export default function Item({ name, onClick, icon: Icon }: ItemProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: '12px' }}
      className="group min-h-[32px] text-sm py-1 pr-3 hover:bg-primary/5 flex items-center text-muted-foreground font-medium cursor-pointer rounded-md transition"
    >
      <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      <span className="truncate">{name}</span>
    </div>
  );
}
