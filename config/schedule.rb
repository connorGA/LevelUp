every 1.day, at: "12:00 am" do
    runner "ResetTasksJob.perform_later"
end