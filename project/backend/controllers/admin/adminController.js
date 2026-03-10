    import { getRoles } from "../../models/admin/adminController.model.js";
    import { HTTP_STATUS } from "../../constants/httpStatus.js";
    import { logApplicationEvent } from "../../utils/logger.js";

    export const getRolesController = async (req, res) => {
        try {
            const roles = await getRoles();
            
            logApplicationEvent({
                logLevel: "INFO",
                logType: "admin",
                method: req.method,
                endpoint: req.originalUrl,
                userId: req.userId || null,
                adminId: req.adminId || null,
                statusCode: HTTP_STATUS.OK,
                message: "Roles retrieved successfully",
                responseTime: Date.now() - req.startTime
            });

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: roles,
                message: "Roles retrieved successfully"
            });
        } catch (error) {
            logApplicationEvent({
                logLevel: "ERROR",
                logType: "admin",
                method: req.method,
                endpoint: req.originalUrl,
                userId: req.userId || null,
                adminId: req.adminId || null,
                statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: "Failed to retrieve roles",
                details: error.message,
                responseTime: Date.now() - req.startTime
            });

            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to retrieve roles",
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    };