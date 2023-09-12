import AppLogo from "@/assets/img/logo.gif";

export const AppHeader = () => {
  return (
    <header className="app-header-main-container main-layout">
      <img src={AppLogo} alt="app-logo" />
      <h1>CyAttack</h1>
    </header>
  );
};
