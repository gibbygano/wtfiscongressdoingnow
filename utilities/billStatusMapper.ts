const billStatus = {
	"ats": "Amendment Tracking System (ATS)",
	"rh": "Reported in House (RH)",
	"ih": "In House (IH)",
	"rs": "Reported in Senate (RS)",
	"is": "In Senate (IS)",
};

const mapBillStatus = (statusCode: string) => billStatus[statusCode as keyof typeof billStatus];

export { mapBillStatus };
