export const Links = {
    area: (areaId: string) => {
        return {
            insights: `/${areaId}/`,
            projects: `/${areaId}/projects`,
            permits: `/${areaId}/permits`,
            zoning: `/${areaId}/zoning`,
            organizations: `/${areaId}/organizations`,
            org: (orgId: string) => `/${areaId}/organizations/${orgId}`,
            project: (projectId: string) => `/${areaId}/projects/${projectId}`
        }
    },
    login: '/login'
}

export const ExternalLinks = {
    corporateSite: 'https://statecraft.one'
}