export const Links = {
    area: (areaId: string) => {
        return {
            insights: `/${areaId}/`,
            projects: (year?: string) => (year ? `/${areaId}/projects?year=${year}` : `/${areaId}/projects`),
            permits: `/${areaId}/permits`,
            permit: (permitId: string) => ({
                view: `/${areaId}/permits/${permitId}`
            }),
            zoning: `/${areaId}/zoning`,
            organizations: `/${areaId}/organizations`,
            org: (orgId: string) => ({
                view: `/${areaId}/organizations/${orgId}`,
                edit: `/${areaId}/organizations/${orgId}/edit`
            }),
            project: (projectId: string) => ({
                view: `/${areaId}/projects/${projectId}`,
                edit: `/${areaId}/projects/${projectId}/edit`
            })
        }
    },
    login: '/login'
}

export const ExternalLinks = {
    corporateSite: 'https://statecrafthq.com',
    corporateEmail: 'hello@statecraft.one'
}