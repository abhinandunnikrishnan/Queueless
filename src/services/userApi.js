import apiService from "../api/apiService";

// ------------------------user---------------------------------

// register:auth component when click on register button
export const registerAPI=async(userData)=>{
    return await apiService("POST","/register",userData)
}

// Login:auth component when click on Login button
export const loginAPI=async(userData)=>{
    return await apiService("POST","/login",userData)
}

// google-Login:auth component when click on google-Login button
export const googleLoginAPI=async(userData)=>{    
    return await apiService("POST","/google-login",userData)
}

// editUser:edit component when click on edit button
export const userEditAPI=async(userId,userData)=>{    
    return await apiService("PUT",`/user/${userId}`,userData)
}

// ------------------------Organisation---------------------------------
// register-org:auth2 component when click on register button
export const registerOrgAPI=async(orgData)=>{
    return await apiService("POST","/register-org",orgData)
}

// Login-org:auth component when click on Login button
export const loginOrgAPI=async(orgData)=>{
    return await apiService("POST","/login-org",orgData)
}

// get organisations:organisation component when page loads
export const getAllOrganizationsAPI =async()=>{
    return await apiService("GET","/organizations",{})
}

// view-organisation/:id
export const viewOrganisationApi = async(id)=>{
    return await apiService("GET",`/organizations/${id}`,{}) 
}

// Update organisation profile
export const updateOrgProfileAPI = async (orgData) => {
    return await apiService("PUT", "/update-org", orgData);
};

// Get admin dashboard statistics
export const getAdminDashboardStatsAPI = async () => {
    return await apiService("GET", "/admin/dashboard-stats");
};

// Get all users and organizations for Admin Resource page
export const getAdminResourcesAPI = async () => {
    return await apiService("GET", "/admin/resources");
};

// Approve an organization
export const approveOrganizationAPI = async (orgId) => {
    return await apiService(
        "PATCH",
        `/admin/organizations/${orgId}/approve`
    );
};

// Remove an organization
export const removeOrganizationAPI = async (orgId) => {
    return await apiService(
        "DELETE",
        `/admin/organizations/${orgId}`
    );
};
