const format = (number) => {
  const num = parseInt(number || "0");
  const format = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num).replace(" ₫", "");

  return format
}

const parseNumber = (number) => {
  return number.replace(/\D/g, "");
}

const formatHelper = {
  format,
  parseNumber
}

export default formatHelper