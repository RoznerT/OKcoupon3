class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
       getCompany : "http://localhost:8080/administrator/getCompany/",
       updateCompany: "http://localhost:8080/administrator/updateCompany",
       updateCustomer: "http://localhost:8080/administrator/updateCustomer",
       addCompany : "http://localhost:8080/administrator/newCompany",
       addCustomer : "http://localhost:8080/administrator/newCustomer",
       allCompanies: "http://localhost:8080/administrator/allCompanies",
       allCustomers: "http://localhost:8080/administrator/allCustomers",
       companyCoupons:  "http://localhost:8080/administrator/getCompanyCoupons/",
       customerCoupons: "http://localhost:8080/administrator/getCustomerPurchase/",
       getCustomer: "http://localhost:8080/administrator/getCustomer/",
       adminLogin: "http://localhost:8080/administrator/Login",
        customerLogin: "http://localhost:8080/customer/Login",
        companyLogin: "http://localhost:8080/company/Login",
        guestCoupons: "http://localhost:8080/guest/allCouponsInSystem",
        deleteCustomer: "http://localhost:8080/administrator/deleteCustomer/",
        deleteCompany: "http://localhost:8080/administrator/deleteCompany/",
        allCompanyCoupons: "http://localhost:8080/company/allCouponsCompany",
        companyDetails: "http://localhost:8080/company/companyDetails",
        deleteCoupon: "http://localhost:8080/company/deleteCoupon/",
        addCoupon: "http://localhost:8080/company/newCoupon",
        updateCoupon: "http://localhost:8080/company/updateCoupon",
        allCustomerCoupons: "http://localhost:8080/customer/allCouponsCustomer",
        customerDetails: "http://localhost:8080/customer/customerDetails",
        purchaseCoupon: "http://localhost:8080/customer/newPurchase/"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
       getCompany: "/administrator/getCompany/",
       updateCompany: "/administrator/updateCompany",
       updateCustomer: "/administrator/updateCustomer",
       addCompany : "/administrator/newCompany",
       addCustomer : "/administrator/newCustomer",
       allCompanies: "/administrator/allCompanies",
       allCustomers: "/administrator/allCustomers",
       companyCoupons:  "/administrator/getCompanyCoupons/",
       customerCoupons: "/administrator/getCustomerPurchase/",
       getCustomer: "/administrator/getCustomer/",
       adminLogin: "/administrator/Login",
       customerLogin: "/customer/Login",
       companyLogin: "/company/Login",
       guestCoupons: "/guest/allCouponsInSystem",
       deleteCustomer: "/administrator/deleteCustomer/",
       deleteCompany: "/administrator/deleteCompany/",
       allCompanyCoupons: "/company/allCouponsCompany",
        companyDetails: "/company/companyDetails",
        deleteCoupon: "/company/deleteCoupon/",
        addCoupon: "/company/newCoupon",
        updateCoupon: "/company/updateCoupon",
        allCustomerCoupons: "/customer/allCouponsCustomer",
        customerDetails: "/customer/customerDetails",
        purchaseCoupon: "/customer/newPurchase/"

    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;

export default globals;