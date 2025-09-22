const billStatus = {
	ats: "Agreed to Senate (ATS)",
	rh: "Reported in House (RH)",
	ih: "Introduced in House (IH)",
	rs: "Reported in Senate (RS)",
	is: "Introduced in Senate (IS)",
	rfs: "Referred in Senate (RFS)",
	rfh: "Referred in House (RFH)",
	eas: "Engrossed Amendment Senate (EAS)",
	enr: "Enrolled (ENR)",
	pcs: "Placed on Calendar Senate (PCS)",
	eh: "Engrossed in House (EH)",
	es: "Engrossed in Senate (ES)",
	aes: "Agreed to Engrossed Senate (AES)",
};

const mapBillStatus = (statusCode: string) =>
	billStatus[statusCode as keyof typeof billStatus];

export { mapBillStatus };
