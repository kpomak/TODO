from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "This command create some users from fixture"

    def handle(self, *args, **options):
        call_command("loaddata", "group_data.json", "users_data.json", "projects_data.json", "todo_data.json")
