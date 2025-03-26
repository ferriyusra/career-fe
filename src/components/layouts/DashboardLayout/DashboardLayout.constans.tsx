import { FaHandHoldingHeart, FaWallet, FaTag, FaUser } from "react-icons/fa6"

const SIDEBAR_USER = [
  {
    key: "profile",
    label: "Profile",
    href: "/user/profile",
    icon: <FaUser />
  },
]

const SIDEBAR_ADMIN = [
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: <FaTag />
  },
]

export {
  SIDEBAR_ADMIN,
  SIDEBAR_USER
}