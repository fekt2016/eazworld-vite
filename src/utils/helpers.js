import { jwtDecode } from "jwt-decode";

// import { formatDistance, parseISO } from 'date-fns';
// import { differenceInDays } from 'date-fns/esm';

// We want to make this function work for both Date objects and strings (which come from Supabase)
// export const subtractDates = (dateStr1, dateStr2) =>
//   differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// export const formatDistanceFromNow = (dateStr) =>
//   formatDistance(parseISO(dateStr), new Date(), {
//     addSuffix: true,
//   })
//     .replace('about ', '')
//     .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
// export const getToday = function (options = {}) {
//   const today = new Date();

// This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
//   if (options?.end)
//     // Set to the last second of the day
//     today.setUTCHours(23, 59, 59, 999);
//   else today.setUTCHours(0, 0, 0, 0);
//   return today.toISOString();
// };

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export function formatDate(dateStr) {
  const date = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));

  return date;
}

export const randomOrderId = () => {
  const seq = (Math.floor(Math.random() * 100000) + 100000)
    .toString()
    .substring(1);
  const orderId = `EW${seq}`;
  return orderId;
};

export function formatTime(date) {
  const at = Number(new Date(date));
  const dateNow = Number(new Date());

  const calcDayspassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDayspassed(dateNow, at);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // else {
  // 	// const now = new Date(date);
  // 	// const day = `${now.getDate()}`.padStart(2, 0);
  // 	// const month = `${now.getMonth() + 1}`.padStart(2, 0);
  // 	// const year = now.getFullYear();
  // 	// return `${day}/${month}/${year}`;
  // }
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function returnRole(token) {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp) * 1000;
    console.log("expireTime", expireTime);

    if (new Date(Date.now()) > expireTime) {
      localStorage.removeItem("token");
      return "";
    } else {
      return decodeToken;
    }
  } else {
    return "";
  }
}

// export function generateSKU(sellerId) {
//   console.log("sellerId", sellerId);
//   // const categoryCode = cat.category.substring(0, 4).toUpperCase();
//   // const sellerCode = `SELLER${sellerId.id.slice(0, 4)}`; // SELLER012
//   // const attributeCode = cat.color.substring(0, 3).toUpperCase(); // BLU
//   // const uniqueId = Math.floor(Math.random() * 1000)
//   //   .toString()
//   //   .padStart(4, "0"); // 1001
//   // return `${categoryCode}-${sellerCode}-${attributeCode}-${uniqueId}`;
//   // const categoryCode = cat.category
//   //   .substring(0, 4)
//   //   .toUpperCase()
//   //   .padEnd(4, "X");
//   const sellerCode = `SELLER${sellerId.id.toString().slice(0, 4)}`;
//   // const attributeCode = cat.color.substring(0, 3).toUpperCase().padEnd(3, "X");
//   const uniqueId = uuidv4().substring(0, 4);

//   return `${sellerCode}-${uniqueId}`;
// }

// export function generateSKU({
//   user,
//   selectedCategoryType,
//   variantTypes,
//   selectedOptions,
// }) {
//   const prefix =
//     {
//       clothing: "CLTH",
//       electronics: "ELEC",
//     }[selectedCategoryType] || "PROD";
//   const variantCodes = variantTypes || [];
//   variantCodes.map((type) => selectedOptions[type]?.join("") || "").join("-");
//   return `${prefix}-${user.id.slice(-4)}-${variantCodes}-${Date.now().toString(
//     36
//   )}`;
// }

export const generateSKU = ({ user, category, variants }) => {
  const variantString = Object.values(variants)
    .join("-")
    .replace(/\s+/g, "")
    .substring(0, 3)
    .toUpperCase();

  return `${user.id.slice(-3)}-${category.slice(
    0,
    3
  )}-${variantString}-${Date.now().toString().slice(-4)}`;
};

export const getParentName = (parentId, categories) => {
  if (!parentId) return "None";
  const parent = categories.find((cat) => cat._id === parentId);
  return parent ? parent.name : "Unknown";
};
