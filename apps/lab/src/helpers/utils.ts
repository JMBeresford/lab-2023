import { useLabStore } from "./store";

export const hoverHandlers = {
  onMouseOver: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    useLabStore.setState({ hovering: true });
  },
  onMouseOut: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    useLabStore.setState({ hovering: false });
  },
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    useLabStore.setState({ hovering: false });
  },
};
