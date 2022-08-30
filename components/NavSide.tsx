import * as React from "react";
import { useRef, useEffect } from "react";
import { motion, useCycle } from "framer-motion";
import styles from "../styles/NavSide.module.css";
import Image from "next/image";
import heart from "../public/img/heart.svg"
import key from "../public/img/key.svg"
import coin from "../public/img/coin.svg"
import cloud from "../public/img/cloud.svg"
import info from "../public/img/info.svg"

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const NavSide = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      className={styles.nav}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className={styles.background} variants={sidebar} />
      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default NavSide;

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="white"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }:any) => (
  <button className={styles.button} onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

const variantsNavigation = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = () => (
  <motion.ul className={styles.ul} variants={variantsNavigation}>
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.ul>
);

const itemIds = [0, 1, 2, 3, 4];

const variantsMenuItem = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

// const colors: string[] = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
const texts : string[] = ["Exhibition", "Tickets", "ETG", "UNMIND STUDY", "Affiliates"]
const icons: any[] = [heart, key, info, cloud, coin]
export const MenuItem = ({ i }:any) => {
//   const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      className={styles.li}
      variants={variantsMenuItem}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={styles.icon}> { <Image layout="responsive" src={icons[i]} alt=""  />} </div>

      <p> {texts[i]} </p>
    </motion.li>
  );
};

const useDimensions = (ref:any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, [ref]);

  return dimensions.current;
};
