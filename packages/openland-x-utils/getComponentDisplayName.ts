export function getComponentDisplayName(Component: any) {
    return Component.displayName || Component.name || 'FunctionalStateless';
}