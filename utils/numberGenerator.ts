// Function to generate the custom ID
export function generateNumber(): string {
  const digits = Math.floor(10 + Math.random() * 9000).toString(); // Generate 4 random digits
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let letters = "";
  for (let i = 0; i < 2; i++) {
    letters += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return `${letters}${digits}`;
}
