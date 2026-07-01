import { styles } from "../assets/dummyStyles";
import Navbar from "./Navbar";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Utensils } from "lucide-react";

const API = "http://localhost:7339/api";
const CATEGORY_ICONS = {
  Food: <Utensils className="w-4 h-4" />,
  Housing: <Home className="w-4 h-4" />,
  Transport: <Car className="w-4 h-4" />,
  Shopping: <ShoppingCart className="w-4 h-4" />,
  Entertainment: <Gift className="w-4 h-4" />,
  Utilities: <Zap className="w-4 h-4" />,
  Healthcare: <Activity className="w-4 h-4" />,
  Salary: <ArrowUp className="w-4 h-4" />,
  Freelance: <CreditCard className="w-4 h-4" />,
  Savings: <PiggyBank className="w-4 h-4" />,
};

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
                <p className={styles.statCards.cardValue}>${stats}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
