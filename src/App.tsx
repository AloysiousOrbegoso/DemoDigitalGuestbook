import { casaDeVista } from "./data/casaDeVista";
import { useViewport } from "./hooks/useViewport";
import { DesktopShell } from "./components/shell/DesktopShell";
import { MobileShell } from "./components/shell/MobileShell";

export default function App() {
  const { isDesktop } = useViewport();
  return isDesktop ? <DesktopShell content={casaDeVista} /> : <MobileShell content={casaDeVista} />;
}
