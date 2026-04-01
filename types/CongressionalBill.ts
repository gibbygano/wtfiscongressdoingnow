export default interface CongressionalBill {
  packageId: string;
  lastModified: Date;
  packageLink: URL;
  title: string;
  dateIssued: Date;
}
