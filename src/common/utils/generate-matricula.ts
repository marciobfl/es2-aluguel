export default function generateMatricula() {
  const currentYear = new Date().getFullYear();
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `${currentYear}${randomNumber}`;
}
