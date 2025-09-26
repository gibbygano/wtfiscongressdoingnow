import { MemberRoleBadge } from "components/Bills";
import { Accordion, Collapse, Status } from "components/shared";
import "dayjs";
import { TbBook, TbFileStack, TbUsersGroup } from "@preact-icons/tb";
import { useBillSummaryContext } from "context";

const BillsSummaryAccordion = () => {
  const {
    packageId,
    sponsors,
    references,
    summaryLoading,
    summaryError,
    actions,
    actionsLoading,
    actionsError,
    cardHasInteractionSignal,
  } = useBillSummaryContext();

  const joinName = `${packageId}-accordion`;

  return (
    <Accordion onFocusInCapture={() => (cardHasInteractionSignal.value = true)}>
      <Collapse
        id={`${packageId}-sponsors`}
        joinName={joinName}
        collapseTitle={
          <>
            Sponsors <TbUsersGroup />
          </>
        }
      >
        <Status error={summaryError} loading={summaryLoading}>
          <div class="prose prose-slate dark:prose-invert mb-5">
            {sponsors || summaryLoading ? (
              sponsors?.map(({ memberName, party, state, role }) => (
                <p>
                  {memberName} - {party} {state}
                  <br />
                  <MemberRoleBadge role={role} />
                </p>
              ))
            ) : (
              <p>No sponsers, check back later.</p>
            )}
          </div>
        </Status>
      </Collapse>
      <Collapse
        id={`${packageId}-references`}
        joinName={joinName}
        collapseTitle={
          <>
            References <TbBook />
          </>
        }
      >
        <Status error={summaryError} loading={summaryLoading}>
          <div class="prose prose-slate dark:prose-invert mb-5 ml-7">
            {references || summaryLoading ? (
              references?.map(({ contents }) => (
                <ul class="pl-2.5">
                  {contents.map(({ title, label, sections }) => (
                    <li>
                      <span class="whitespace-nowrap">
                        {title} {label}
                      </span>
                      &nbsp;
                      <ul class="pl-2.5">
                        {sections &&
                          sections.map((section) => (
                            <li>
                              <a
                                target="_blank"
                                href={`https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title${title}-section${section}&num=0&edition=prelim`}
                              >
                                §{section}
                              </a>
                              &nbsp;
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ))
            ) : (
              <p>No references, check back later.</p>
            )}
          </div>
        </Status>
      </Collapse>
      <Collapse
        id={`${packageId}-actions`}
        joinName={joinName}
        collapseTitle={
          <>
            Actions <TbFileStack />
          </>
        }
      >
        <Status error={actionsError} loading={actionsLoading}>
          <div class="prose prose-slate dark:prose-invert mb-5">
            {actions || actionsLoading ? (
              actions?.map(({ actionDate, text }) => (
                <>
                  <p class="border-b font-bold">
                    {dayjs(actionDate).format("dddd MMMM D, YYYY")}
                  </p>
                  <p>{text}</p>
                </>
              ))
            ) : (
              <p>No actions, check back later.</p>
            )}
          </div>
        </Status>
      </Collapse>
    </Accordion>
  );
};

export default BillsSummaryAccordion;
