class ResetTasksJob < ApplicationJob
  queue_as :default

  def perform
    Task.where(completed: true).find_each do |task|
      if task.frequency_reset_needed?
        task.reset_task
        Rails.logger.info "Task #{task.id} reset successfully."
      else
        Rails.logger.info "Task #{task.id} does not need reset."
      end
    end
  end
end

