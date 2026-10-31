namespace AdminHelper.Services;

public class ShutdownService
{
	private readonly StatusService _statusService;
	private readonly Program _program;
	private readonly ILogger<ShutdownService> _logger;

	public ShutdownService(StatusService statusService, Program program, ILogger<ShutdownService> logger)
	{
		this._statusService = statusService;
		this._program = program;
		this._logger = logger;
	}

	public bool IsShuttingDown => this._statusService.CurrentStatus == Status.ShuttingDown;

	/// <summary>
	/// Soft shutdown: wait for running tasks to finish, then stop the host.
	/// </summary>
	/// <param name="ownTaskCount">
	/// Number of entries in <see cref="Program.RunningTasks"/> belonging to the caller itself
	/// (1 for a slash command, since the dispatcher registers it; 0 for callers outside command dispatch).
	/// </param>
	/// <param name="progress">Called with the remaining task count on start and every second. Not called after completion.</param>
	/// <param name="completed">Called with <see langword="true"/> right before shutting down, <see langword="false"/> if canceled.</param>
	/// <returns><see langword="true"/> if shutdown was triggered, <see langword="false"/> if canceled.</returns>
	public async Task<bool> RunAsync(int ownTaskCount, Func<int, Task>? progress = null, Func<bool, Task>? completed = null)
	{
		this._statusService.CurrentStatus = Status.ShuttingDown;

		if (progress is not null)
			await progress(this._program.RunningTasks.Count - ownTaskCount);
		while (this._program.RunningTasks.Count > ownTaskCount)
		{
			await Task.Delay(1000);
			if (progress is not null)
				await progress(this._program.RunningTasks.Count - ownTaskCount);
			if (this._statusService.CurrentStatus == Status.Normal)
			{
				this._logger.LogInformation("Shutdown canceled.");
				if (completed is not null)
					await completed(false);
				return false;
			}
		}
		if (completed is not null)
			await completed(true);

		// note: notifcation already done in the notification service, no need to do it here
		this._logger.LogInformation("Shutting down.");
		this._program.CancellationTokenSource.Cancel();
		return true;
	}
}
