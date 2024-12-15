import { FileSystemTypes, WindowTypes } from "@/types/types"

const formatDateTime = () => {
    const current = new Date()
    const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true }

    const date = current.toLocaleDateString('en-UD', dateOptions)
    const time = current.toLocaleTimeString('en-US', timeOptions);
    return { date, time };
}

const findFolder = (data: FileSystemTypes[], path: string[]): FileSystemTypes | undefined => {
    if (path.length === 0) return undefined;

    const [currentFolder, ...remainingPath] = path;

    // Find the current folder
    const folder = data.find((item) => item.name === currentFolder && item.type === 'folder');

    if (!folder) return undefined; // Folder not found

    // If there's more in the path, search within the children
    if (remainingPath.length > 0) {
        return findFolder(folder.children || [], remainingPath);
    }

    // If it's the last in the path, return the folder
    return folder;
}

function createNewFolder(
    data: FileSystemTypes[],
    path: string[],
    child: FileSystemTypes
): FileSystemTypes[] {
    // Base case: if the path is empty, return the data unchanged
    if (path.length === 0) return data;

    // Destructure the path into the current folder name and the remaining path
    const [currentFolder, ...remainingPath] = path;

    // Map over the data to find the target folder
    return data.map((item) => {
        if (item.name === currentFolder && item.type === 'folder') {
            // If it's the target folder and there's more path to traverse, recurse
            if (remainingPath.length > 0) {
                return {
                    ...item,
                    children: createNewFolder(item.children || [], remainingPath, child),
                };
            }

            // If it's the final folder in the path, add the child to its children
            return {
                ...item,
                children: [...(item.children || []), child],
            };
        }

        // Return the item unchanged if it doesn't match
        return item;
    });
}

function renameFolder(
    data: FileSystemTypes[],
    path: string[],
    newName: string
): FileSystemTypes[] {
    if (path.length === 0) return data; // No path means no change

    const [currentFolder, ...remainingPath] = path;

    return data.map((item) => {
        if (item.name === currentFolder && item.type === 'folder') {
            if (remainingPath.length > 0) {
                // Continue searching deeper in the hierarchy
                return {
                    ...item,
                    children: renameFolder(item.children || [], remainingPath, newName),
                };
            }

            // If this is the last folder in the path, rename it and update its path
            const updatedPath = [...(item.path?.slice(0, -1) || []), newName];

            return {
                ...item,
                name: newName,
                path: updatedPath,
                children: updateChildPaths(item.children || [], updatedPath),
            };
        }

        // Return the item unchanged if it doesn't match
        return item;
    });
}

// Helper function to update paths for all child objects recursively
function updateChildPaths(
    children: FileSystemTypes[],
    parentPath: string[]
): FileSystemTypes[] {
    return children.map((child) => {
        const updatedPath = [...parentPath, child.name];
        return {
            ...child,
            path: updatedPath,
            children: updateChildPaths(child.children || [], updatedPath),
        };
    });
}


// trash and restore with merge
function moveToTrash(data: FileSystemTypes[], path: string[]): FileSystemTypes[] {
    // Helper function to recursively find and remove the item immutably
    const removeItem = (data: FileSystemTypes[], path: string[]): FileSystemTypes[] => {
        return data.reduce((updatedData, currentItem) => {
            // If the current item's path matches the target path, skip it (effectively removing it)
            if (JSON.stringify(currentItem.path) === JSON.stringify(path)) {
                return updatedData; // Skip the item, thus removing it from the array
            }

            // If the current item has children, recursively create a new copy of the children array
            if (currentItem.children) {
                const updatedChildren = removeItem(currentItem.children, path);
                updatedData.push({
                    ...currentItem, // Create a new object for the current item
                    children: updatedChildren // Set the updated children to the new object
                });
            } else {
                // For items without children, just add them as is
                updatedData.push(currentItem);
            }

            return updatedData;
        }, [] as FileSystemTypes[]);
    };

    // Call the helper function to get the updated data without the specified path
    return removeItem(data, path);
}









// function restoreFromTrash(data: FileSystemTypes[], restorePath: string[], trashPath: string[] = ['Trash']): FileSystemTypes[] {
//     const trashFolder = data.find((folder) => folder.path.join('/') === trashPath.join('/'));

//     if (!trashFolder || !trashFolder.children) return data; // No items in Trash to restore

//     return data.map((item) => {
//         // If we reach the trash folder, we can restore items
//         if (item.path.join('/') === trashPath.join('/')) {
//             const itemToRestore = trashFolder.children.find(
//                 (child) => child.path.join('/') === restorePath.join('/')
//             );

//             if (itemToRestore) {
//                 // Add the item back to its original position
//                 data = createNewFolder(data, restorePath.slice(0, -1), itemToRestore);

//                 // Remove the item from the Trash folder
//                 trashFolder.children = trashFolder.children.filter(
//                     (child) => child.path.join('/') !== restorePath.join('/')
//                 );
//             }

//             return trashFolder;
//         }

//         // Continue searching deeper in the hierarchy
//         if (item.children) {
//             return {
//                 ...item,
//                 children: restoreFromTrash(item.children, restorePath, trashPath),
//             };
//         }

//         return item;
//     });
// }




// function mergeChildren(existingChildren: FileSystemTypes[], newChildren: FileSystemTypes[]): FileSystemTypes[] {
//     const merged: { [key: string]: FileSystemTypes } = {};

//     [...existingChildren, ...newChildren].forEach((child) => {
//         const key = child.path.join('/');
//         if (merged[key] && child.type === 'folder') {
//             // Merge the children for folders
//             merged[key].children = mergeChildren(merged[key].children || [], child.children || []);
//         } else {
//             // Add or overwrite the entry
//             merged[key] = child;
//         }
//     });

//     return Object.values(merged);
// }

const activeWindowFunc = (windows: WindowTypes[]): WindowTypes => {
    const largestIdObject = windows.reduce((max, current) => {
        return current.zIndex > max.zIndex ? current : max;
    }, windows[0]);
    return largestIdObject;
}





export {
    formatDateTime,
    findFolder,
    createNewFolder,
    renameFolder,
    moveToTrash,
    activeWindowFunc
}