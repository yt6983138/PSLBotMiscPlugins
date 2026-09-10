using SmartFormat;

namespace AdminHelper.Services;

public sealed class MaintenanceNotificationService : IDisposable
{
	private readonly StatusService _statusService;
	private readonly IOptions<AdminConfig> _config;
	private readonly ILogger<MaintenanceNotificationService> _logger;
	private readonly AdminHelperPlugin _plugin;

	public MaintenanceNotificationService(
		StatusService statusService,
		IOptions<AdminConfig> config,
		ILogger<MaintenanceNotificationService> logger,
		AdminHelperPlugin plugin)
	{
		this._statusService = statusService;
		this._config = config;
		this._logger = logger;
		this._plugin = plugin;
		this._statusService.StatusChanged += this.StatusService_StatusChanged;
	}

	internal async Task SendMessage(string? message, StatusChangeEventArgs e, object? args = null)
	{
		if (this._plugin.NotificationChannel is null || message is null) return;
		await this._plugin.NotificationChannel.SendMessageAsync(Smart.Format(message, new
		{
			ExtraArgs = args,
			e.OldStatus,
			e.NewStatus,
			e.LastStatusChangeTime,
			CurrentTime = DateTimeOffset.UtcNow,
			TimeSpan = DateTimeOffset.UtcNow - e.LastStatusChangeTime
		}));
	}

	/// <summary>
	/// this catches all exceptions
	/// </summary>
	/// <param name="e"></param>
	/// <returns></returns>
	public async Task NotifyShutdown(StatusChangeEventArgs? e = null)
	{
		try
		{
			await this.SendMessage(this._config.Value.ShutdownNotification, e ?? new(Status.Normal, Status.ShuttingDown, DateTimeOffset.UtcNow));
		}
		catch (Exception ex)
		{
			this._logger.LogError(ex, "Error occurred while notifying shutdown.");
		}
	}

	private async void StatusService_StatusChanged(object? sender, StatusChangeEventArgs e)
	{
		try
		{
			await this.StatusChangedCore(e);
		}
		catch (Exception ex)
		{
			this._logger.LogError(ex, "Error occurred while handling status change event.");
		}
	}
	private async Task StatusChangedCore(StatusChangeEventArgs e)
	{
		if (e.NewStatus == Status.UnderMaintenance)
		{
			this._logger.LogInformation("Notifying users about maintenance");
			await this.SendMessage(this._config.Value.MaintenanceNotification, e);
		}
		else if (e.NewStatus == Status.ShuttingDown)
		{
			this._logger.LogInformation("Notifying users about shutdown");
			await this.NotifyShutdown(e);
		}
		else if (e.NewStatus == Status.UpdatingData)
		{
			this._logger.LogInformation("Notifying users about data update");
			await this.SendMessage(this._config.Value.UpdateDataNotification, e);
		}
		else if (e.OldStatus == Status.UnderMaintenance && e.NewStatus == Status.Normal)
		{
			this._logger.LogInformation("Notifying users about maintenance completion");
			await this.SendMessage(this._config.Value.MaintenanceEndNotification, e);
		}
		else if (e.OldStatus == Status.ShuttingDown && e.NewStatus == Status.Normal)
		{
			this._logger.LogInformation("Notifying users about shutdown cancellation");
			await this.SendMessage(this._config.Value.ShutdownCanceledNotification, e);
		}
		else if (e.OldStatus == Status.UpdatingData && e.NewStatus == Status.Normal)
		{
			this._logger.LogInformation("Notifying users about data update completion");
			await this.SendMessage(this._config.Value.UpdateDataEndNotification, e);
		}
	}

	public void Dispose()
	{
		this._statusService.StatusChanged -= this.StatusService_StatusChanged;
	}
}
