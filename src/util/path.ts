/**
 *
 * @param path
 * @param fullPath
 * @param currentPath
 * @return FunctionPath
 */
export const getFunctionPath = (path: string, fullPath: string, currentPath: string) => {
    return `${`${fullPath.split(currentPath)[1].substring(1)}${path}`.replace(/\\/g, '/')}`;
};
