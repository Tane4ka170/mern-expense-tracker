import { styles } from "../assets/dummyStyles";
import Navbar from "./Navbar";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ onLogout, user }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className={styles.layout.root}>
      <Navbar user={user} onLogout={onLogout} />
      <Sidebar
        user={user}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />
      <div className={styles.layout.mainContainer(sidebarCollapsed)}>
        <div className={styles.header.container}>
          <div>
            <h1 className={styles.header.title}>Dashboard</h1>
            <p className={styles.header.subtitle}>Welcome back</p>
          </div>
        </div>

        <div className={styles.statCards.grid}>
          <div className={styles.statCards.card}>
            <div className={styles.statCards.cardHeader}>
              <div>
                <p className={styles.statCards.cardTitle}>Total Balance</p>
                <p className=""></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
