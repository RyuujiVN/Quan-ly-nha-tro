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

const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })

  return formatter.format(date);
}

const formatMonthYear = (date) => {
  return date.toISOString().slice(0, 7)
}

const formatMonthWatch = (date) => {
  return `${date.getMonth() + 1}/${date.getFullYear()}`
}

const formatDateWatch = (date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })

  return formatter.format(date);
}

const formatHelper = {
  format,
  parseNumber,
  formatDate,
  formatDateWatch,
  formatMonthYear,
  formatMonthWatch
}

export default formatHelper