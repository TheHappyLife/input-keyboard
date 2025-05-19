import clsx from "clsx";

export interface BottomNavbarItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

function BottomNavbarItem({ icon, label }: BottomNavbarItemProps) {
  return (
    <div className={clsx("bottom-navbar-item-container")}>
      <img src={icon} alt={label} />
      <span>{label}</span>
    </div>
  );
}

export default BottomNavbarItem;
